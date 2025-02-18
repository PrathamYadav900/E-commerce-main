import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Media() {

  return (
    <div className='flex justify-around '>
      { Array.from(new Array(4)).map(( index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
    
        </Box>
      ))}
    </div>
  );
}

export default function ESkeleton() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Media  />
    </Box>
  );
}
