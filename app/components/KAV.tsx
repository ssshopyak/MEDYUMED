import React from 'react';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from 'react-native';

interface Props extends KeyboardAvoidingViewProps{
  children?: React.ReactNode;
}

export function KAV(props: Props) {
  const { children, ..._props } = props;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      {..._props}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
