import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Grid,
  InputLabel,
  Typography,
  Button,
} from '@material-ui/core';

import { Career as ICareer } from '../domain/entity/career';
import profileActions from '../store/profile/actions';
import { RootState } from '../domain/entity/rootState';
import { PROFILE } from '../domain/services/profile';
import { exitEmptyCareers } from '../domain/services/career';

import useStyles from './styles';

const Career: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const careers = useSelector((state: RootState) => state.profile.careers);
  const validation = useSelector((state: RootState) => state.validation);
  const isAbleToAddCareer = exitEmptyCareers(careers);

  const handleChange = (member: Partial<ICareer>, i: number) => {
    dispatch(profileActions.setCareer({ career: member, index: i }));
  };

  const handleAddCareer = () => {
    dispatch(profileActions.addCareer({}));
  };

  const handleDeleteCareer = (i: number) => {
    dispatch(profileActions.deleteCareer(i));
  };

  return (
    <>
      {careers.map((c, i) => (
        <Fragment key={i}>
          <Typography variant="h5" component="h3" className={classes.title}>
            職歴{i + 1}
          </Typography>
          <TextField
            className={classes.formField}
            fullWidth
            error={!!validation.message.careers[i]?.company}
            helperText={validation.message.careers[i]?.company}
            label={PROFILE.CAREERS.COMPANY}
            value={c.company}
            onChange={(e) => handleChange({ company: e.target.value }, i)}
          />
          <TextField
            className={classes.formField}
            fullWidth
            error={!!validation.message.careers[i]?.position}
            helperText={validation.message.careers[i]?.position}
            label={PROFILE.CAREERS.POSITION}
            value={c.position}
            onChange={(e) => handleChange({ position: e.target.value }, i)}
          />
          <div className={classes.careerSpan}>
            <InputLabel shrink>{PROFILE.CAREERS.SPAN}</InputLabel>
            <Grid
              container
              spacing={1}
              alignContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  error={!!validation.message.careers[i]?.startAt}
                  helperText={validation.message.careers[i]?.startAt}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={c.startAt}
                  onChange={(e) => handleChange({ startAt: e.target.value }, i)}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography align="center">〜</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  error={!!validation.message.careers[i]?.endAt}
                  helperText={validation.message.careers[i]?.endAt}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={c.endAt}
                  onChange={(e) => handleChange({ endAt: e.target.value }, i)}
                />
              </Grid>
            </Grid>
          </div>
          <Button
            className={classes.button}
            onClick={() => handleDeleteCareer(i)}
            fullWidth
            variant="outlined"
            color="secondary"
          >
            職歴{i + 1}を削除
          </Button>
        </Fragment>
      ))}
      <Button
        className={classes.button}
        onClick={handleAddCareer}
        fullWidth
        variant="outlined"
        disabled={isAbleToAddCareer}
      >
        職歴を追加
      </Button>
    </>
  );
};

export default Career;
