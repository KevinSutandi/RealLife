import React, { useState } from 'react';

import { Button, NativeModules, Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';
import EventCard from '../components/EventCard';
import { ref, onValue } from 'firebase/database';
import { db } from '../components/AuthUtils';


export default function Events({ navigation }) {	// 

	const [groups, setGroups] = React.useState([]);

	// get the groups data
	React.useEffect(() => {
    const groupsRef = ref(db, 'groups');

    // Use the 'onValue' function to listen for changes to the data
    const unsubscribe = onValue(groupsRef, (snapshot) => {
      const groupsData = [];

      // Check if the snapshot exists and has children
      if (snapshot.exists()) {
        // Loop through the snapshot and extract the data
        snapshot.forEach((childSnapshot) => {
          const group = childSnapshot.val();
          groupsData.push({ id: childSnapshot.key, ...group });
        });
        setGroups(groupsData);
      }
    });

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

	return (
		<View style={styles.main}>
			<View style={styles.topBar}>
				<View style={styles.buttonTop}>
					<Button title='Top' color='#AF66CC' />
				</View>
				<View style={styles.buttonTop}>
					<Button title='Local' color='#AF66CC'/>
				</View>
				<View style={styles.buttonTop}>
					<Button title='This Week' color='#AF66CC'/>
				</View>
				<View style={styles.buttonTop}>
					<Button title='My Events' color='#AF66CC'/>
				</View>
			</View>
			<View style={styles.content}>
				<ScrollView style={styles.scrollView}>
					{groups.length === 0 ? (
						<Text style={styles.noEventsText}>There is currently no events!!</Text>
					) : (
						Object.entries(groups).map(([_, group]) => {
							if (group.events && typeof group.events === 'object') {
								return Object.entries(group.events).map(([eventKey, event]) => (
									<View key={eventKey}>
										<EventCard
											title={event.name}
											location={event.location}
											description={event.description}
											startDate={event.startDate}
											endDate={event.endDate}
											image={event.image}
											price={event.price}
											createdBy={event.createdBy}
											onPress={() => navigation.navigate("EventDetails", { 
												groupKey: group.id,
												eventKey: eventKey,
												title: event.name, 
												location: event.location, 
												description: event.description, 
												startDate: event.startDate, 
												endDate: event.endDate, 
												image: event.image,
												price: event.price,
												createdBy: event.createdBy
											})}
										/>
									</View>
								));
							} else {
								// Skip or return null, or render a placeholder, etc.
								return <Text>No events! Go to one of the groups and create one!</Text>;
							}
						})
					)}
				</ScrollView> 
			</View>
			
		</View>
	);
}

const styles = StyleSheet.create({
  main: {
		flex: 1,
		display: 'flex',
	},
	scrollView: {
    width: '100%', // Ensure the ScrollView takes the full width
  },
	noEventsText: {
		color: 'white',
    textAlign: 'center', // Center the text if there are no events
    marginTop: 20, // Add some space at the top
  },
	topBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: 'rgb(46,46,46)',
		width: '100%',
		paddingBottom: 7
	},
	content: {
		backgroundColor: 'rgb(26,26,26)',
		height: '100%',
		flex: 1,
		paddingRight: 20,
		paddingLeft: 20,
	},
	top: {
		color: 'white',
		paddingTop: 10,
	},
	buttonTop: {
		color: 'white',
		backgroundColor: 'rgb(57, 57, 57)',
		borderRadius: 20,
	}
});
