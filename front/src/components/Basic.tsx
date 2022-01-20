import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@material-ui/core';

import { PROFILE } from '../domain/services/profile';

import useStyles from './styles';
import { RootState } from '../domain/entity/rootState';
import { Profile } from '../domain/entity/profile';
import { Gender } from '../domain/entity/gender';
import profileActions from '../store/profile/actions';

import { calculateValidation } from '../domain/services/validation';
import validationActions from '../store/validation/actions';

const Basic: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);
  const classes = useStyles();

  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member));

    recalculateValidation(member);
  };

  const recalculateValidation = (member: Partial<Profile>) => {
    if (!validation.isStartValidation) return;

    const newProfile = {
      ...profile,
      ...member,
    };

    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        required
        error={!!validation.message.name}
        helperText={validation.message.name}
        label={PROFILE.NAME}
        value={profile.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        error={!!validation.message.description}
        helperText={validation.message.description}
        className={classes.formField}
        rows={5}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        onChange={(e) => handleChange({ description: e.target.value })}
      />
      <FormControl
        error={!!validation.message.gender}
        required
        className={classes.formField}
      >
        <FormLabel>{PROFILE.GENDER}</FormLabel>
        <RadioGroup
          value={profile.gender}
          onChange={(e) => handleChange({ gender: e.target.value as Gender })}
        >
          <FormControlLabel
            value="male"
            label="男性"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="female"
            label="女性"
            control={<Radio color="primary" />}
          />
        </RadioGroup>
        <FormHelperText>{validation.message.gender}</FormHelperText>
      </FormControl>
      <TextField
        fullWidth
        required
        error={!!validation.message.birthday}
        helperText={validation.message.birthday}
        className={classes.formField}
        label={PROFILE.BIRTHDAY}
        type="date"
        value={profile.birthday}
        onChange={(e) => handleChange({ birthday: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
};

export default Basic;
