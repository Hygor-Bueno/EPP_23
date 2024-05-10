import React from "react";
import Supper from "./Supper";
import ThemeContextConnectionProvider from "../../Theme/ThemeConnection";
import ThemeContextRegisterProvider from "../../Theme/ThemeRegisterProd";
import { StyleSheetManager } from "styled-components";
import ThemeTableProdContextsProvider from "../../Theme/ThemeTableProd";

const Register = () => {
    return (
        <StyleSheetManager enableVendorPrefixes shouldForwardProp={(prop) => !prop.startsWith('_') && !prop.startsWith('data-')}>
            <ThemeContextConnectionProvider>
                <ThemeContextRegisterProvider>
                    <ThemeTableProdContextsProvider>
                        <Supper />
                    </ThemeTableProdContextsProvider>
                </ThemeContextRegisterProvider>
            </ThemeContextConnectionProvider>
        </StyleSheetManager>
    )
}

export default Register;