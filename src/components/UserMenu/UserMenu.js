import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import { Stack, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <Typography>Welcome, {name}</Typography>
      <IconButton
        class="icon"
        type="button"
        aria-label="logout"
        color="secondary"
        onClick={() => dispatch(authOperations.logOut())}
      >
        <LogoutIcon />
      </IconButton>
    </Stack>
  );
}
