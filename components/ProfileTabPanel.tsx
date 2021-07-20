import { useState, ChangeEvent } from 'react';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import ProfilePatternItem from '@components/ProfilePatternItem';
import ProfileVideoItem from 'components/ProfileVideoItem';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { Profile } from '@types';
import styles from '@styles/components/ProfileTab.module.scss';

type Props = {
  profile: Profile;
};

const ProfileTabPanel = ({ profile }: Props) => {
  const [value, setValue] = useState('1');

  const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        classes={{ flexContainer: styles.tab }}
        onChange={handleChange}
        aria-label="contenido de tu perfil"
      >
        <Tab icon={<PictureAsPdfIcon />} value="1" label="PATRONES" aria-label="pdf" />
        <Tab icon={<VideoLibraryIcon />} value="2" label="VIDEOS" aria-label="video" />
      </TabList>
      <TabPanel value="1">
        {profile && profile.purchases.length === 0 && <div>Aún no tienes ningún patrón</div>}
        {profile &&
          profile.purchases.length > 0 &&
          profile.purchases.map((purchase) =>
            purchase.itemsIds.map((itemId) => (
              <ProfilePatternItem
                key={purchase._id}
                purchaseId={purchase._id}
                itemId={itemId}
                pending={purchase.status !== 'approved'}
                paymentId={purchase.paymentId}
              />
            )),
          )}
      </TabPanel>
      <TabPanel value="2">
        {profile && profile.purchases.length === 0 && <div>Aún no tienes ningún patrón</div>}
        {profile &&
          profile.purchases.length > 0 &&
          profile.purchases.map((purchase) =>
            purchase.itemsIds.map((itemId) => (
              <ProfileVideoItem
                key={purchase._id}
                purchaseId={purchase._id}
                itemId={itemId}
                pending={purchase.status !== 'approved'}
                paymentId={purchase.paymentId}
              />
            )),
          )}
      </TabPanel>
    </TabContext>
  );
};

export default ProfileTabPanel;
