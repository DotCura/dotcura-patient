import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import ContactUsComponent from '../../components/ContactUs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTranslation } from '../../localization/i18n/i18n.config';

const ContactUsContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const contactusArray = [
    {
      name: getTranslation('whattapptitle'),
      subtitle: getTranslation('whatappsubtitle'),
      btnName: getTranslation('whatappbtnname'),
      btnPressfun: () => {
        console.log('WhatsApp Pressed');
      },
    },
    {
      name: getTranslation('contacttitle'),
      subtitle: getTranslation('contactsubtitle'),
      btnName: `${getTranslation('contactbtnname')} +39 339 45 77 874`,
      btnPressfun: () => {
        console.log('WhatsApp Pressed');
      },
    },
  ];

  const [contactUsData, setContactUsData] = useState(contactusArray);
  return (
    <ContactUsComponent
      insets={insets}
      contactUsData={contactUsData}
      navigation={navigation}
    />
  );
};

export default ContactUsContainer;
