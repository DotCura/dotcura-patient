import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import ContactUsComponent from '../../components/ContactUs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { flashMessageWarning } from '../../constants/GConstant';

const ContactUsContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const contactusArray = [
    {
      name: getTranslation('whattapptitle'),
      subtitle: getTranslation('whatappsubtitle'),
      btnName: getTranslation('whatappbtnname'),
      btnPressfun: () => {
        openWhatsApp('393932094179'); // without +
      },
    },
    {
      name: getTranslation('contacttitle'),
      subtitle: getTranslation('contactsubtitle'),
      btnName: `${getTranslation('contactbtnname')} +39 339 45 77 874`,
      btnPressfun: () => {
        makePhoneCall('+393932094179');
      },
    },
  ];

  const [contactUsData, setContactUsData] = useState(contactusArray);

  const openWhatsApp = async (phone: string) => {
    const url = `https://wa.me/${phone}`;

    try {
      await Linking.openURL(url);
    } catch (error) {
      flashMessageWarning('Unable to open WhatsApp');
    }
  };

  const makePhoneCall = async (phone: string) => {
    const url = `tel:${phone}`;
    await Linking.openURL(url);
  };

  return (
    <ContactUsComponent
      insets={insets}
      contactUsData={contactUsData}
      navigation={navigation}
    />
  );
};

export default ContactUsContainer;
