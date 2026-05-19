// import React, { useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     FlatList,
//     Image,
//     Dimensions,
//     StyleSheet,
//     StatusBar,
//     ImageBackground,
// } from 'react-native';
// import IMG from '../../assets/Images';

// import CustomButton from '../../components/Button';
// import { baseGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
// import { App_Primary_color } from '../../common/Colors/colors';

// const { width } = Dimensions.get('window');

// const slides = [
//     {
//         id: '1',
//         title: 'Welcome to Azania HRMS!',
//         sub: 'Make Smart Decisions! Set clear timelines for projects and celebrate your achievements!',
//         image: IMG.onboarding1, // apni image laga
//         primary: 'Next',
//         secondary: 'Skip',
//     },
//     {
//         id: '2',
//         title: 'Smart Task Management',
//         sub: 'Track priorities, deadlines, and team progress all in one place.',
//         image: IMG.Onboarding2,
//         primary: 'Next',
//         secondary: 'Skip',
//     },

// ];

// export default function OnboardingCarousel({ navigation }) {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const flatListRef = useRef(null);

//     const goToSlide = (index) => {
//         flatListRef.current?.scrollToIndex({ index, animated: true });
//         setCurrentIndex(index);
//     };

//     const handleNext = () => {
//         if (currentIndex < slides.length - 1) {
//             goToSlide(currentIndex + 1);
//         }
//     };

//     const handleSkip = () => {
//         goToSlide(slides.length - 1);
//     };

//     const handlePrimary = () => {
//         if (currentIndex < slides.length - 1) {
//             handleNext();
//         } else {
//             navigation?.navigate('SignIn'); // apna route laga
//         }
//     };

//     const handleSecondary = () => {
//         if (currentIndex < slides.length - 1) {
//             handleSkip();
//         } else {
//             navigation?.navigate('SignUp'); // apna route laga
//         }
//     };

//     const onViewableItemsChanged = useRef(({ viewableItems }) => {
//         if (viewableItems.length > 0) {
//             setCurrentIndex(viewableItems[0].index);
//         }
//     });

//    const renderSlide = ({ item }) => (
//   <View style={{ width, flex: 1 }}>
//     <ImageBackground
//       source={item?.image}
//       style={{ flex: 1, width: '100%', height: '100%' }}
//       resizeMode="cover"
//       imageStyle={{ opacity: 0.9 }}
//     >
//         <View style={{position:'absolute', bottom: 60, width: '100%', paddingHorizontal: 24, gap:10}}>
//             <CustomButton title={'Next'}/>
//             <TouchableOpacity style={{alignSelf:'center', marginTop: 6, borderWidth:1, width:'100%', borderRadius:20, paddingVertical:10, alignItems:'center', justifyContent:'center', borderColor:App_Primary_color}} onPress={handleSecondary}>
//                 <Text style={{color:App_Primary_color, fontSize: 16, fontWeight: '700'}}>Skip</Text>
//             </TouchableOpacity>
//         </View>
//     </ImageBackground>
//   </View>
// );

//     const currentSlide = slides[currentIndex];

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

//             {/* Swipeable image area */}
//             <FlatList
//                 ref={flatListRef}
//                 data={slides}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderSlide}
//                 horizontal
//                 pagingEnabled
//                 showsHorizontalScrollIndicator={false}
//                 onViewableItemsChanged={onViewableItemsChanged.current}
//                 viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
//                 style={styles.flatList}
//             />


//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // backgroundColor: '#c2bcf7',
//     },
//     flatList: {
//         flex: 1,
//     },
//     slide: {
//         width,
//         flex: 1,
//         // backgroundColor: '#c4bef5',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 60,
//         paddingHorizontal: 24,
//     },
//     imageContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: width * 0.78,
//         height: '100%',
//     },
//     bottomSheet: {
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 32,
//         borderTopRightRadius: 32,
//         paddingHorizontal: 24,
//         paddingTop: 28,
//         paddingBottom: 36,
//         alignItems: 'center',
//         gap: 10,
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: '700',
//         color: '#18183a',
//         textAlign: 'center',
//         lineHeight: 30,
//     },
//     subtitle: {
//         fontSize: 14,
//         color: '#888',
//         textAlign: 'center',
//         lineHeight: 22,
//         marginTop: 4,
//     },
//     dotsRow: {
//         flexDirection: 'row',
//         gap: 6,
//         marginVertical: 8,
//     },
//     dot: {
//         width: 8,
//         height: 8,
//         borderRadius: 6,
//         backgroundColor: '#d5d0f5',
//     },
//     dotActive: {
//         width: 28,
//         backgroundColor: '#5c4ee8',
//     },
//     btnPrimary: {
//         width: '100%',
//         paddingVertical: 15,
//         borderRadius: 50,
//         backgroundColor: '#5c4ee8',
//         alignItems: 'center',
//         marginTop: 6,
//     },
//     btnPrimaryText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '700',
//         letterSpacing: 0.3,
//     },
//     btnOutline: {
//         width: '100%',
//         paddingVertical: 13,
//         borderRadius: 50,
//         borderWidth: 2,
//         borderColor: '#5c4ee8',
//         alignItems: 'center',
//     },
//     btnOutlineText: {
//         color: '#5c4ee8',
//         fontSize: 15,
//         fontWeight: '600',
//     },
// });



import React, { useState, useRef, use } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    StyleSheet,
    StatusBar,
    ImageBackground,
} from 'react-native';
import IMG from '../../assets/Images';
import { useIsFocused } from '@react-navigation/native'
import CustomButton from '../../components/Button';
import { App_Primary_color } from '../../common/Colors/colors';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Welcome to Azania HRMS!',
        sub: 'Make Smart Decisions! Set clear timelines for projects and celebrate your achievements!',
        image: IMG.onboarding1,
        primary: 'Next',
        secondary: 'Skip',
    },
    {
        id: '2',
        title: 'Smart Task Management',
        sub: 'Track priorities, deadlines, and team progress all in one place.',
        image: IMG.Onboarding2,
        primary: 'Sign In',
        secondary: 'Sign Up',
    },
];

export default function OnboardingCarousel({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

      const isFocused = useIsFocused()
    


    const goToSlide = (index) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setCurrentIndex(index);
    };

    const handlePrimary = () => {
        if (currentIndex < slides.length - 1) {
            goToSlide(currentIndex + 1);
        } else {
            navigation?.navigate('Login');
        }
    };

    const handleSecondary = () => {
        if (currentIndex < slides.length - 1) {
            goToSlide(slides.length - 1); // skip to last
        } else {
            navigation?.navigate('SignUp');
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    const renderSlide = ({ item }) => (
        <View style={{ width, flex: 1 }}>
            <ImageBackground
                source={item?.image}
                style={{ flex: 1, width: '100%', height: '100%' }}
                resizeMode="cover"
                imageStyle={{ opacity: 0.9 }}
            />
        </View>
    );

    const isLastSlide = currentIndex === slides.length - 1;

    return (
        <View style={styles.container}>
{       isFocused &&     <StatusBar barStyle="light-content" backgroundColor={App_Primary_color} translucent />}

            {/* Swipeable image area */}
            <FlatList
                ref={flatListRef}
                data={slides}
                keyExtractor={(item) => item.id}
                renderItem={renderSlide}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                style={styles.flatList}
            />

            {/* Fixed bottom overlay with dots + buttons */}
            <View style={styles.bottomOverlay}>

                {/* Carousel Dot Indicators */}
                <View style={styles.dotsRow}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.dotActive,
                            ]}
                        />
                    ))}
                </View>

                {/* Primary Button */}
                <CustomButton
                    title={isLastSlide ? 'Sign In' : 'Next'}
                    onPress={handlePrimary}
                />

                {/* Secondary Button */}
                <TouchableOpacity
                    style={styles.outlineBtn}
                    onPress={handleSecondary}
                >
                    <Text style={styles.outlineBtnText}>
                        {isLastSlide ? 'Sign Up' : 'Skip'}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
    },
    bottomOverlay: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        paddingHorizontal: 24,
        gap: 10,
        alignItems: 'center',
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 12,
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    dotActive: {
        width: 28,
        height: 8,
        borderRadius: 6,
        backgroundColor: App_Primary_color,
    },
    outlineBtn: {
        alignSelf: 'center',
        marginTop: 6,
        borderWidth: 1,
        width: '100%',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: App_Primary_color,
    },
    outlineBtnText: {
        color: App_Primary_color,
        fontSize: 16,
        fontWeight: '700',
    },
});