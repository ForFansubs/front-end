import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const options = {
    overrides: {
        h1: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: 'h1',
                component: 'h2',
            },
        },
        h2: { component: Typography, props: { gutterBottom: true, variant: 'h2' } },
        h3: { component: Typography, props: { gutterBottom: true, variant: 'h3' } },
        h4: {
            component: Typography,
            props: { gutterBottom: true, variant: 'h4' },
        },
        p: { component: Typography },
        a: { component: Link },
        li: {
            component: (({ classes, ...props }) => (
                <li>
                    <Typography component="span" {...props} />
                </li>
            )),
        },
    },
};

export default function Markdown(props) {
    return <ReactMarkdown options={options} {...props} />;
}