import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {Alert, View} from 'react-native';

import {logoutAction} from '../actions/auth';
import {useAppState} from '../hooks/appState';
import {asyncKeys} from '../reducers/appReducer';
import styles from '../styles/main';
import {asyncMultiRemove} from '../util/async';

function CustomDrawerContent(props) {
	const [state, dispatch] = useAppState();

	const {loggedIn} = state;

	function handleClearData() {
		Alert.alert(
			'Confirm:',
			'Are you sure you want to delete all of your local data? This will log you out and remove your connection to Liferay.',
			[
				{
					style: 'cancel',
					text: 'Cancel',
				},
				{
					onPress: () => {
						asyncMultiRemove(asyncKeys);

						dispatch({type: 'RESET'});
					},
					text: 'Yes, Delete It All',
				},
			],
			{cancelable: false}
		);
	}

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={[styles.spaceBetween, styles.mb4]}
		>
			<View>
				<DrawerItemList {...props} />
			</View>

			{loggedIn.value && (
				<View>
					<DrawerItem
						label="Log Out"
						onPress={() => dispatch(logoutAction())}
					/>

					<DrawerItem
						label="Remove All Local Data"
						onPress={() => handleClearData()}
					/>
				</View>
			)}
		</DrawerContentScrollView>
	);
}

export default CustomDrawerContent;
