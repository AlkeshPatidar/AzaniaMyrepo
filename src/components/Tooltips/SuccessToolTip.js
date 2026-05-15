import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { FONTS_FAMILY } from '../../assets/Fonts';

const { width } = Dimensions.get('window');

let toastRef = null;

const ToastMessage = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success'); // success, error, warning, info
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        toastRef = {
            show: showToast,
        };
    }, []);

    const showToast = (msg, toastType = 'success', duration = 3000) => {
        setMessage(msg);
        setType(toastType);
        setVisible(true);

        // Animate in
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto hide after duration
        setTimeout(() => {
            hideToast();
        }, duration);
    };

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setVisible(false);
        });
    };

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#10B981',
                    icon: '✓',
                };
            case 'error':
                return {
                    backgroundColor: '#EF4444',
                    icon: '✕',
                };
            case 'warning':
                return {
                    backgroundColor: '#F59E0B',
                    icon: '⚠',
                };
            case 'info':
                return {
                    backgroundColor: '#3B82F6',
                    icon: 'ℹ',
                };
            default:
                return {
                    backgroundColor: '#10B981',
                    icon: '✓',
                };
        }
    };

    if (!visible) return null;

    const toastStyle = getToastStyle();

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: toastStyle.backgroundColor,
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{toastStyle.icon}</Text>
            </View>
            <Text style={styles.message} numberOfLines={2}>
                {message}
            </Text>
            <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 9999,
    },
    iconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    icon: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    message: {
        flex: 1,
        fontSize: 14,
        fontFamily: FONTS_FAMILY.Poppins_Medium,
        color: '#fff',
        lineHeight: 20,
    },
    closeButton: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    closeText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

// Export helper functions
export const showToast = (message, type = 'success', duration = 3000) => {
    if (toastRef) {
        toastRef.show(message, type, duration);
    }
};

export default ToastMessage;