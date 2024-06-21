import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteConfProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const DeleteConf: React.FC<DeleteConfProps> = (props) => {
    const { open, handleClose, handleConfirm } = props;

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="delete-confirmation-dialog">
            <DialogTitle id="delete-confirmation-dialog">Delete Confirmation</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete this item?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleConfirm} color="secondary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConf;
