import { InjectionToken } from '@angular/core';

export const BASE_IMG_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
export interface UserScoreConfig {
  width: number;
  percentageLevels: PercentageLevels;
  levelColors: LevelColors;
  coefficient: Coefficient;
}

export interface PercentageLevels {
  none: number;
  extraSmall: number;
  small: number;
  medium: number;
  large: number;
}

export interface LevelColors {
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface Coefficient {
  forOuterRing: number;
  forPercentRing: number;
  forSpan: number;
  forSup: number;
}

export const defaultPercentageLevels: PercentageLevels = {
  none: 0,
  extraSmall: 20,
  small: 40,
  medium: 60,
  large: 80,
};

export const defaultCoefficient: Coefficient = {
  forOuterRing: 1.1,
  forPercentRing: 0.9,
  forSpan: 0.6,
  forSup: 0.2,
};

export const defaultLevelColors: LevelColors = {
  extraSmall: '#ffe599',
  small: '#ffd966',
  medium: '#cadc37',
  large: '#afaa4a',
  extraLarge: '#01D277FF',
};
export const defaultUserScoreConfig: UserScoreConfig = {
  width: 36,
  percentageLevels: defaultPercentageLevels,
  levelColors: defaultLevelColors,
  coefficient: defaultCoefficient,
};

export const USER_SCORE_WIDTH_CONFIG_TOKEN =
  new InjectionToken<UserScoreConfig>('userScoreConfig', {
    providedIn: 'root',
    factory: () => defaultUserScoreConfig,
  });


