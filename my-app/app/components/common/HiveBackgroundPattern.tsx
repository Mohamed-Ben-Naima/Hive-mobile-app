import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';

interface HiveBackgroundPatternProps {
  responsiveScale: number;
}

const HiveBackgroundPattern: React.FC<HiveBackgroundPatternProps> = ({ responsiveScale }) => {
  const { width, height } = Dimensions.get('window');
  
  // Simplified hexagon size calculation
  const hexSize = Math.min(width, height) * 0.06 * responsiveScale;
  
  // Generate hexagon points
  const createHexagon = (centerX: number, centerY: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = centerX + hexSize * Math.cos(angle);
      const y = centerY + hexSize * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Create a simpler grid of hexagons
  const hexagons = [];
  const spacing = hexSize * 1.5;
  const rows = Math.ceil(height / spacing) + 1;
  const cols = Math.ceil(width / spacing) + 1;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const centerX = col * spacing + (row % 2) * (spacing / 2);
      const centerY = row * spacing;
      
      hexagons.push({
        points: createHexagon(centerX, centerY),
        opacity: 0.02 + Math.random() * 0.03,
      });
    }
  }

  return (
    <View style={{ position: 'absolute', width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FBBF24" stopOpacity="0.1" />
            <Stop offset="100%" stopColor="#F59E0B" stopOpacity="0.05" />
          </LinearGradient>
        </Defs>
        
        {hexagons.map((hex, index) => (
          <Polygon
            key={index}
            points={hex.points}
            fill="url(#hexGradient)"
            fillOpacity={hex.opacity}
            stroke="#FBBF24"
            strokeWidth={0.3}
            strokeOpacity={0.05}
          />
        ))}
      </Svg>
    </View>
  );
};

export default HiveBackgroundPattern;