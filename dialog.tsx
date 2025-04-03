import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogClose, DialogTitle, DialogDescription } from '../components/ui/dialog';

const DialogPage = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn">Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogOverlay />
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>This is a description of the dialog.</DialogDescription>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPage;
