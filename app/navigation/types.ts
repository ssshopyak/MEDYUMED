import { IAppointmentServices } from '../lib/types';

export type AuthStackProps = {
  'onboard'?: {},
  'login'?:{},
  'registration_name'?:{},
  'test'?: {},
}

export type MainStackProps = {
  'profileStack'?:{},
  'entryStack'?:{},
  'homeStack'?:{},
  'event'?: {},
  'tab'?: {},
  'branches'?: {},
  'chat'?: {},
  'record'?: {},
  'test'?: {},
  'service'?:{},
  'selectData' ? : {},
  'dateTime'?:{},
  'master'?:{},
  'selectService':{ content: IAppointmentServices[] },
  'confirmation'?:{},
  'selectMaster' ? : { update: () => void },
  'newFeedback'?:{},
  'sale'?:{},
  'popularServices'?:{ popularServiceContent: IAppointmentServices[], title: string},
}

export type ProfileProps = {
  'profile'?: {},
  'personalInfo' ? : {},
  'changePassword'?:{},
  'bonuses' ? : {},
  'visits' ? : {},
  'discount'?:{},
}

export type EntryProps = {
  'event'?:{},
  'endConfirmation'?:{},
}

export type HomeProps = {
  'main'?: {},
  'visits' ? : {},
  'bonuses' ? : {},
}
