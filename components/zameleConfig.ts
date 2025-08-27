// Zamele Design System Configuration
export interface ZameleColors {
    primary: string;
    primaryBlue: string;
    blueGradient: {
      colors: string[];
      angle: number;
    };
    white: string;
    lightGray: string;
    mediumGray: string;
    black: string;
  }
  
  export interface ZameleTypography {
    heading: {
      fontFamily: string;
      fontWeight: string;
    };
    body: {
      fontFamily: string;
      fontWeight: string;
    };
    meta: {
      fontFamily: string;
      fontWeight: string;
    };
  }
  
  export const zameleConfig = {
    colors: {
      primary: '#2A7FF3',
      primaryBlue: '#2A7FF3',
      blueGradient: {
        colors: ['#A23FF3', '#1E86C7'],
        angle: 130,
      },
      white: '#FFFFFF',
      lightGray: '#E2E8F0',
      mediumGray: '#94A3B8',
      black: '#0F172A',
    } as ZameleColors,
  
    typography: {
      heading: {
        fontFamily: 'Inter-Bold',
        fontWeight: '700',
      },
      body: {
        fontFamily: 'Inter-Regular',
        fontWeight: '400',
      },
      meta: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
      },
    } as ZameleTypography,
  
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
  
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      round: 50,
    },
  
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
  
    shadows: {
      sm: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      md: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      lg: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
      },
    },
  };
  
  // Helpers
  export const getColor = (colorName: keyof ZameleColors): string => {
    return zameleConfig.colors[colorName] as string;
  };
  
  export const getSpacing = (size: keyof typeof zameleConfig.spacing): number => {
    return zameleConfig.spacing[size];
  };
  
  export const getFontSize = (size: keyof typeof zameleConfig.fontSize): number => {
    return zameleConfig.fontSize[size];
  };
  
  export const getBorderRadius = (size: keyof typeof zameleConfig.borderRadius): number => {
    return zameleConfig.borderRadius[size];
  };
  
  export const getShadow = (size: keyof typeof zameleConfig.shadows) => {
    return zameleConfig.shadows[size];
  };
  
  export default zameleConfig;
    