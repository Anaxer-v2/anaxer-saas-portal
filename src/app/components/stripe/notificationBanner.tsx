import React from 'react';
import { StripeConnectInstance } from '@stripe/connect-js';
import {
    ConnectNotificationBanner,
    ConnectComponentsProvider,
  } from '@stripe/react-connect-js';

interface NotificationBannerUIProps {
    stripeConnectInstance: StripeConnectInstance;
}

const NotificationBannerUI: React.FC<NotificationBannerUIProps> = ({ stripeConnectInstance }) => {
    return (
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <ConnectNotificationBanner
          // Optional:
          // collectionOptions={{
          //   fields: 'eventually_due',
          //   futureRequirements: 'include',
          // }}
        />
      </ConnectComponentsProvider>
    );
};

export default NotificationBannerUI;
