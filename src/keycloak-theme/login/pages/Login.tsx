import { useState, FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import type { I18n } from "../i18n";
import { Card, CardBody } from "@nextui-org/react";
import CircleExclamation from "../assets/CircleExclamation";

const my_custom_param = new URL(window.location.href).searchParams.get(
  "my_custom_param"
);

if (my_custom_param !== null) {
  console.log("my_custom_param:", my_custom_param);
}

// comment was made so i can commit

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  return (
    <div
      id="kc-form-wrapper"
      className={clsx(
        "flex w-screen h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500",
        realm.password &&
          social.providers && [
            getClassName("kcFormSocialAccountContentClass"),
            getClassName("kcFormSocialAccountClass"),
          ]
      )}
    >
      {realm.password && (
        <form
          id="kc-form-login"
          onSubmit={onSubmit}
          action={url.loginAction}
          className="bg-white px-12 pb-5 rounded-lg shadow-xl w-[35%]"
          method="post"
        >
          <h1 className="text-center py-5 text-2xl text-blue-600">
            {msg("doLogIn")}
          </h1>
          {kcContext.message !== undefined &&
            (kcContext.message.type !== "warning" ||
              !kcContext.isAppInitiatedAction) && (
              <Card shadow="sm" className="bg-red-400 mb-4">
                <CardBody className="flex flex-row gap-2 items-center">
                  <CircleExclamation className="text-red-600" />
                  {kcContext.message.summary}
                </CardBody>
              </Card>
            )}
          <div>
            {!usernameHidden &&
              (() => {
                const label = !realm.loginWithEmailAllowed
                  ? "username"
                  : realm.registrationEmailAsUsername
                  ? "email"
                  : "usernameOrEmail";

                const autoCompleteHelper: typeof label =
                  label === "usernameOrEmail" ? "username" : label;

                return (
                  <>
                    <Input
                      id={autoCompleteHelper}
                      name={autoCompleteHelper}
                      defaultValue={login.username ?? ""}
                      type="text"
                      autoFocus={true}
                      label={msg(label)}
                      size="sm"
                      className="pb-4"
                      variant="underlined"
                      autoComplete="off"
                    />
                  </>
                );
              })()}
          </div>
          <div>
            <>
              <Input
                id="password"
                name="password"
                type="password"
                label={msg("password")}
                size="sm"
                variant="underlined"
                autoComplete="off"
              />
            </>
          </div>
          <div className="pt-6 flex justify-between">
            <div id="kc-form-options">
              {realm.rememberMe && !usernameHidden && (
                <div className="checkbox">
                  <Checkbox
                    id="rememberMe"
                    size="md"
                    name="rememberMe"
                    {...(login.rememberMe === "on"
                      ? {
                          checked: true,
                        }
                      : {})}
                  >
                    {msg("rememberMe")}
                  </Checkbox>
                </div>
              )}
            </div>
            <div className={getClassName("kcFormOptionsWrapperClass")}>
              {realm.resetPasswordAllowed && (
                <Link href={url.loginResetCredentialsUrl}>
                  {msg("doForgotPassword")}
                </Link>
              )}
            </div>
          </div>
          <div id="kc-form-buttons" className="flex justify-center pt-8">
            <input
              type="hidden"
              id="id-hidden-input"
              name="credentialId"
              {...(auth?.selectedCredential !== undefined
                ? {
                    value: auth.selectedCredential,
                  }
                : {})}
            />
            <Button
              fullWidth
              name="login"
              id="kc-login"
              type="submit"
              isDisabled={isLoginButtonDisabled}
              className="bg-blue-600 text-white"
            >
              {msgStr("doLogIn")}
            </Button>
          </div>
          {realm.password &&
            realm.registrationAllowed &&
            !registrationDisabled && (
              <div id="kc-registration" className="text-center pt-2">
                <span>
                  {msg("noAccount")}
                  <Link className="ml-1" href={url.registrationUrl}>
                    {msg("doRegister")}
                  </Link>
                </span>
              </div>
            )}
        </form>
      )}
    </div>
  );
}
