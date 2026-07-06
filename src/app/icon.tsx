import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#1A1A1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontFamily: 'serif',
            fontSize: 20,
            fontWeight: 700,
            color: '#C9A84C',
            lineHeight: 1,
          }}
        >
          CM
        </div>
      </div>
    ),
    { ...size }
  )
}
