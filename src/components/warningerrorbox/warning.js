import React from "react";

import { Alert } from "@material-ui/lab";

export default function WarningBox(props) {
    return (
        <Alert severity='warning' style={{ width: "100%" }}>
            {props.children}
        </Alert>
    );
}
