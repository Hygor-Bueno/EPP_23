import React from "react";
import Supper from "./Supper";
import ThemeContextConnectionProvider from "../../Theme/ThemeConnection";
import { StyleSheetManager } from "styled-components";
import ThemeRegisterProvider from "../../Theme/ThemeRegister";
import ThemeMenuProvider from "../../Theme/ThemeMenu";
import ThemeLogMenuProvider from "../../Theme/ThemeLogMenu";

const Register = () => {
    return (
        <StyleSheetManager enableVendorPrefixes shouldForwardProp={(prop) => !prop.startsWith('_') && !prop.startsWith('data-')}>
            <ThemeContextConnectionProvider>
              <ThemeRegisterProvider>
                <ThemeMenuProvider>
                  <ThemeLogMenuProvider>
                    <Supper />
                  </ThemeLogMenuProvider>
                </ThemeMenuProvider>
              </ThemeRegisterProvider>
            </ThemeContextConnectionProvider>
        </StyleSheetManager>
    )
}

export default Register;
