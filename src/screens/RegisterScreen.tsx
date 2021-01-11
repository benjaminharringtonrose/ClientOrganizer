import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import Spinner from "../common/components/Spinner";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { REGISTER_USER } from "../store/actions/types";
import { avatarChanged } from "../store/actions";
import { Color, Spacing } from "../common/styles";
import Header from "../common/components/Header";
import Routes from "../navigation/routes";
import UserPermissions from "../util/permissions";
import * as ImagePicker from "expo-image-picker";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  avatar?: string;
  user: any;
  authLoading: boolean;
  authError: boolean;
}
interface DispatchFromState {
  dispatchChangeAvatar: (text: string) => any;
  dispatchRegisterRequest: (object: any) => any;
}

interface LocalState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type RegisterScreenProps = PropsFromState & DispatchFromState & PassedProps;

class RegisterScreen extends Component<RegisterScreenProps, LocalState> {
  public state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  componentDidUpdate(oldProps: any) {
    if (oldProps.authLoading && !this.props.authLoading && !this.props.authError) {
      this.props.navigation.navigate(Routes.DASHBOARD_TABS);
    }
  }

  private onRegisterPress = () => {
    const { email, password, firstName, lastName } = this.state;
    const { avatar } = this.props;

    this.props.dispatchRegisterRequest({
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
  };

  onPickAvatar = async () => {
    try {
      UserPermissions.getCameraPermission();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        this.props.dispatchChangeAvatar(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  private renderButton = () => {
    if (this.props.authLoading) {
      return <Spinner size="large" style={{ marginTop: Spacing.med }} />;
    }
    return <Button label={"Signup"} onPress={this.onRegisterPress} style={styles.button} />;
  };

  renderError() {
    if (this.props.authError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{this.props.authError}</Text>
        </View>
      );
    }
  }

  render() {
    const { firstName, lastName, email, password } = this.state;
    const { avatar } = this.props;

    return (
      <SafeAreaView style={styles.rootContainer}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Header title={"Welcome!"} description={"Sign up to get started."} />
          </View>
          <Card>
            <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.onPickAvatar}>
              {!!avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
              <Ionicons name="ios-add" size={40} color="#FFF" style={styles.addIcon} />
            </TouchableOpacity>
            <CardSection>
              <Input
                label="First Name"
                placeholder="John"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                autoCapitalize={"words"}
                onChangeText={(firstName: string) => this.setState({ firstName })}
                value={firstName}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Last Name"
                placeholder="Smith"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                autoCapitalize={"words"}
                onChangeText={(lastName: string) => this.setState({ lastName })}
                value={lastName}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Email"
                placeholder="email@gmail.com"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                onChangeText={(email: string) => this.setState({ email })}
                value={email}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="Password"
                placeholder="password"
                placeholderTextColor={Color.greyMedDark}
                onChangeText={(password: string) => this.setState({ password })}
                value={password}
              />
            </CardSection>
            {this.renderError()}
            {this.renderButton()}
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ auth }: any) => {
  const { avatar, error, loading, user } = auth;
  return {
    avatar,
    authError: error,
    authLoading: loading,
    user,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchChangeAvatar: (result: string) => dispatch(avatarChanged(result)),
  dispatchRegisterRequest: ({ email, password, firstName, lastName, avatar }: any) => {
    dispatch({
      type: REGISTER_USER.REQUESTED,
      payload: {
        email,
        password,
        firstName,
        lastName,
        avatar,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
  },
  headerContainer: {
    paddingTop: Spacing.xxlarge,
  },
  button: {
    marginVertical: Spacing.med,
    paddingVertical: Spacing.small,
  },
  errorContainer: {
    backgroundColor: Color.darkThemeGreyDark,
  },
  errorText: {
    fontSize: 12,
    alignSelf: "center",
    color: "red",
  },
  avatarPlaceholder: {
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: Color.darkThemeGreyMed,
    borderRadius: 60,
    marginVertical: Spacing.small,
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addIcon: {
    alignSelf: "center",
    marginTop: 38,
    marginLeft: 2,
    color: Color.greyLight,
  },
});
