import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function PlanExpiredDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className='rounded-full'
    PaperProps={{
        style: {
          borderRadius: "16px", // Adjust this value to increase or decrease roundness
        },
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* You would add your custom illustration here
        <Typography variant="h5" align="center" gutterBottom>
          Your Plan Has Expired.
        </Typography>
        <Typography align="center" color="text.secondary">
          Now your customers are unable to view your post. To continue showing your post:
        </Typography> */}
        <Typography align="center" color="#0059A3" sx={{ mt: 2, fontSize: 20, fontWeight:600, fontFamily:"rajdhani" }}>
           Comming Soon.... Stay Tuned.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button variant="contained" 
        sx={{ 
            bgcolor: "#EF6E0B",
            '&:hover': {
              bgcolor: "#EF6E0B",
            },
            fontFamily: "rajdhani",
            borderRadius: 20, 
            px: 4, 
            fontSize: 18
          }} 
         onClick={onClose}>
          RENEW YOUR PLAN
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlanExpiredDialog;