import React from "react";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading(props) {
    const { disableShrink, size } = props;

    return (
        <Box style={{ width: "100%" }} textAlign='center'>
            <CircularProgress
                size={size}
                disableShrink={disableShrink ? true : false}
            />
        </Box>
    );
}
