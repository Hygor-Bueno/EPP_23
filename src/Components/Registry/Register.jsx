import React from "react";
import Supper from "./Supper";
import ThemeContextConnectionProvider from "../../Theme/ThemeConnection";
import ThemeContextRegisterProvider from "../../Theme/ThemeRegisterProd";
import { StyleSheetManager } from "styled-components";

const Register = () => {
    return (
        <StyleSheetManager enableVendorPrefixes shouldForwardProp={(prop) => !prop.startsWith('_') && !prop.startsWith('data-')}>
            <ThemeContextConnectionProvider>
                <ThemeContextRegisterProvider>
                    <Supper />
                </ThemeContextRegisterProvider>
            </ThemeContextConnectionProvider>
        </StyleSheetManager>
    )
}

export default Register;