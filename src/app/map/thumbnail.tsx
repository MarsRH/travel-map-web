'use client';

import { Box, Typography } from '@mui/material';

interface ThumbnailProps {
  name: string;
  imageUrl?: string;
}

export default function Thumbnail({ name, imageUrl }: ThumbnailProps) {
  return (
    <Box
      sx={{
        width: '120px',
        padding: '8px',
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
          marginBottom: '4px'
        }}
      >
        {name}
      </Typography>
      {imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt={name}
          sx={{
            width: '100%',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '2px'
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
    </Box>
  );
}
