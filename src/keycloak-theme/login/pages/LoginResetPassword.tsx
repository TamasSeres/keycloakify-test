import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Input } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, realm, auth } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <div
      id="kc-form-wrapper"
      className="flex w-screen h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <form
        id="kc-reset-password-form"
        action={url.loginAction}
        className="bg-white px-12 pb-5 rounded-sm shadow-xl w-[35%]"
        method="post"
      >
        <h1 className="text-center py-5 text-2xl text-blue-600">
          {msg("emailForgotTitle")}
        </h1>
        <div>
          <Input
            type="text"
            id="username"
            name="username"
            autoFocus
            defaultValue={
              auth !== undefined && auth.showUsername
                ? auth.attemptedUsername
                : undefined
            }
            className="pb-4"
            variant="underlined"
            label={
              !realm.loginWithEmailAllowed
                ? msg("username")
                : !realm.registrationEmailAsUsername
                ? msg("usernameOrEmail")
                : msg("email")
            }
          />
        </div>
        <div>
          <div id="kc-form-options">
            <Link href={url.loginUrl} size="sm" className="pb-4">
              {msg("backToLogin")}
            </Link>
          </div>

          <div id="kc-form-buttons">
            <Button fullWidth type="submit" className="bg-blue-600 text-white">
              {msgStr("doSubmit")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
