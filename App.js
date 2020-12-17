
import React from 'react';
import {
    SafeAreaView,
} from 'react-native';
import Navigation from './src/navigation/navigator';

const App = () => {
    console.log('enter here app');
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navigation />
        </SafeAreaView>
    );
};

export default App;
