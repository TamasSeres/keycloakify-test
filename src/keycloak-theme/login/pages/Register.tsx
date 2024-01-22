// ejected using 'npx eject-keycloak-page'
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export default function RegisterOriginal(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    url,
    messagesPerField,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <div
      id="kc-form-wrapper"
      className="flex w-screen h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <form
        id="kc-register-form"
        className="bg-white px-12 pb-5 rounded-sm shadow-xl w-[35%]"
        action={url.registrationAction}
        method="post"
      >
        <h1 className="text-center py-5 text-2xl text-blue-600">
          {msg("registerTitle")}
        </h1>

        <Input
          id="firstName"
          type="text"
          size="sm"
          name="firstName"
          label={msg("firstName")}
          className="pb-4"
          variant="underlined"
          defaultValue={register.formData.firstName ?? ""}
        />

        <Input
          id="lastName"
          type="text"
          size="sm"
          name="lastName"
          label={msg("lastName")}
          className="pb-4"
          variant="underlined"
          defaultValue={register.formData.lastName ?? ""}
        />

        <Input
          id="email"
          type="text"
          size="sm"
          name="email"
          label={msg("email")}
          className="pb-4"
          variant="underlined"
          autoComplete="email"
          defaultValue={register.formData.email ?? ""}
        />
        {!realm.registrationEmailAsUsername && (
          <Input
            id="username"
            type="text"
            size="sm"
            name="username"
            label={msg("username")}
            className="pb-4"
            variant="underlined"
            autoComplete="username"
            defaultValue={register.formData.username ?? ""}
          />
        )}
        {passwordRequired && (
          <>
            <Input
              id="password"
              type="password"
              size="sm"
              name="password"
              label={msg("password")}
              className="pb-4"
              variant="underlined"
              autoComplete="new-password"
            />

            <Input
              id="password-confirm"
              type="password"
              size="sm"
              name="password-confirm"
              label={msg("passwordConfirm")}
              className="pb-4"
              variant="underlined"
              autoComplete="new-password"
            />
          </>
        )}
        {recaptchaRequired && (
          <div className="form-group">
            <div className={getClassName("kcInputWrapperClass")}>
              <div
                className="g-recaptcha"
                data-size="compact"
                data-sitekey={recaptchaSiteKey}
              ></div>
            </div>
          </div>
        )}
        <div>
          <div id="kc-form-options">
            <div>
              <Link href={url.loginUrl}>{msg("backToLogin")}</Link>
            </div>
          </div>

          <div id="kc-form-buttons" className="flex justify-center pt-8">
            <Button fullWidth type="submit" className="bg-blue-600 text-white">
              {msgStr("doRegister")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
