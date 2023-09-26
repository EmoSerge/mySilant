import * as React from 'react';
import { Container, createTheme, useMediaQuery } from '@mui/material';

const CustomContainer = (props) => {
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 361,
                sm: 1367,
                md: 1441,
                lg: 1537,
                xl: 1921,
            }
        }
    })

    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    let { children, ...others } = props;

    const responsive = () => {

        if (xs) {
            return { maxWidth: '350px'}
        }

        if (sm) {
            return { maxWidth: '1300px'}
        }

        if (md) {
            return { maxWidth: '1350px'}
        }
        
        if (lg) {
            return { padding: '0 20px'}
        }

        if (xl) {
            return { padding: '0 20px'}
        }
        
    }
    const resp = responsive()

    return (
        <Container maxWidth='false' style={resp} {...others}>
            {children}
        </Container>
    )
}

export { CustomContainer };