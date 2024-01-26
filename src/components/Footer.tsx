import React from "react";
import "../index.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TransitionProps} from "@mui/material/transitions";
import {Slide} from "@mui/material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
)
{
    return <Slide direction="right" ref={ref} {...props} />;
});

const Footer: React.FC = () =>
{
    const [ open, setOpen ] = React.useState(false);

    const handleClickOpen = () =>
    {
        setOpen(true);
    };

    const handleClose = () =>
    {
        setOpen(false);
    };

    return (
        <>
            <div>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Contact With Me"}
                    </DialogTitle>
                    <DialogContent>
                        <footer>
                            <div className="text-center marginer mb-2">
                                <a href="https://github.com/caixypromise"><GitHubIcon sx={{ fontSize: 35 }}/></a>
                                <a href="mailto:caixypromised@gmail.com"><EmailIcon sx={{ fontSize: 35 }}/></a>
                            </div>
                            <div className="text-center text-muted">
                                <h6 className="copyright-text text-center text-stone">Copyright © 2024 <a
                                    href="https://github.com/caixypromise">CAIXYPROMISE</a> . All
                                    rights
                                    reserved |
                                    Developed and supported by the CAIXYPROMISE | <a
                                        href="https://github.com/caixypromise">CAIXYPROMISE</a></h6>
                            </div>
                        </footer>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default Footer;
