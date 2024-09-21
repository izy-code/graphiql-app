import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

const CustomSwitch = styled(Switch)(() => ({
  width: 62,
  height: 26,
  padding: 6,
  '& .MuiSwitch-switchBase': {
    margin: 0,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#f0f0f0',
      transform: 'translateX(32px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#1c87b4',
    width: 24,
    height: 24,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

interface SwitcherProps {
  leftText: string;
  rightText: string;
  checked: boolean;
  onChange: () => void;
}

export function Switcher({ leftText, rightText, checked, onChange }: SwitcherProps): ReactNode {
  return (
    <Stack direction="row" component="label" alignItems="center" justifyContent="center">
      <Typography>{leftText}</Typography>
      <CustomSwitch checked={checked} onChange={onChange} />
      <Typography>{rightText}</Typography>
    </Stack>
  );
}
