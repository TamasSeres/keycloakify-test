// ejected using 'npx eject-keycloak-page'
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import "../../../index.css";

export default function Register(
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
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
      <form
        id="kc-register-form"
        action={url.registrationAction}
        method="post"
        className="border rounded-md p-4 bg-white shadow-md w-[30%]"
      >
        <div className="font-medium text-2xl text-center mb-4">Register</div>
        <div id="firstName-wrapper" className="mb-4">
          <div>
            <label htmlFor="firstName">First name</label>
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border rounded-sm w-full px-1"
                defaultValue={register.formData.firstName ?? ""}
              />
            </div>
          </div>
        </div>

        <div id="lastName-wrapper" className="mb-4">
          <div>
            <label htmlFor="lastName">Last name</label>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border rounded-sm w-full px-1"
                defaultValue={register.formData.lastName ?? ""}
              />
            </div>
          </div>
        </div>

        <div id="email-wrapper" className="mb-4">
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                className="border rounded-sm w-full px-1"
                defaultValue={register.formData.email ?? ""}
                autoComplete="email"
              />
            </div>
          </div>
        </div>

        {!realm.registrationEmailAsUsername && (
          <div id="username-wrapper" className="mb-4">
            <div>
              <label htmlFor="username">Username</label>
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="border rounded-sm w-full px-1"
                  defaultValue={register.formData.username ?? ""}
                  autoComplete="username"
                />
              </div>
            </div>
          </div>
        )}
        {passwordRequired && (
          <>
            <div id="password-wrapper" className="mb-4">
              <div>
                <label htmlFor="password">Password</label>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="border rounded-sm w-full px-1"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
            <div id="password-confirm-wrapper" className="mb-4">
              <div>
                <label htmlFor="password-confirm">Confirm password</label>
                <div>
                  <input
                    type="password"
                    id="password-confirm"
                    name="password-confirm"
                    className="border rounded-sm w-full px-1"
                  />
                </div>
              </div>
            </div>
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
        <div className={getClassName("kcFormGroupClass")}>
          <div
            id="kc-form-options"
            className={getClassName("kcFormOptionsClass")}
          >
            <div className={getClassName("kcFormOptionsWrapperClass")}>
              <span>
                <a href={url.loginUrl}>{msg("backToLogin")}</a>
              </span>
            </div>
          </div>

          <div id="kc-form-buttons">
            <input
              type="submit"
              className="border rounded-md bg-blue-600 text-white"
              value={msgStr("doRegister")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
