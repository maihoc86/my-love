// Web fallback — @rnmapbox/maps chỉ chạy trên iOS/Android native build
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { ChevronLeft, MapPin } from 'lucide-react-native';

export default function DateMapScreenWeb() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => ({
            width: 40, height: 40, borderRadius: 20,
            backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <ChevronLeft size={22} color="#1f2937" />
        </Pressable>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#1f2937' }}>Bản đồ hẹn hò</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <View
          style={{
            width: 72, height: 72, borderRadius: 36,
            backgroundColor: '#fff1f2', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <MapPin size={32} color="#f43f5e" />
        </View>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#1f2937', marginBottom: 8, textAlign: 'center' }}>
          Tính năng bản đồ
        </Text>
        <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 22 }}>
          Bản đồ hẹn hò sử dụng thư viện native và chỉ chạy được trên iOS/Android.{'\n\n'}
          Vui lòng mở app trên thiết bị di động.
        </Text>
      </View>
    </SafeAreaView>
  );
}
