import { useFormContext, Controller } from 'react-hook-form';
import {
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { ATTRIBUTE_GROUPS } from '@/lib/constants';
import type { RestaurantFormData } from '@/lib/validations';

export default function AttributesTab() {
  const { control, watch, setValue } = useFormContext<RestaurantFormData>();
  
  // Watch all attributes to know which are active
  const attributes = watch('attributes') || {};
  const featuredAttributes = watch('featuredAttributes') || [];

  const toggleFeatured = (key: string) => {
    const currentFeatured = [...(featuredAttributes || [])];
    const index = currentFeatured.indexOf(key);

    if (index !== -1) {
      // Remove
      currentFeatured.splice(index, 1);
      setValue('featuredAttributes', currentFeatured);
    } else {
      // Add (if under limit)
      if (currentFeatured.length < 5) {
        currentFeatured.push(key);
        setValue('featuredAttributes', currentFeatured);
      }
    }
  };

  return (
    <Stack spacing={4}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Restaurant Attributes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Featured on Card: <strong>{featuredAttributes.length}/5</strong>
        </Typography>
      </Box>

      {Object.entries(ATTRIBUTE_GROUPS).map(([groupKey, group]) => (
        <Box key={groupKey}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {group.label}
          </Typography>
          <FormGroup>
            {group.items.map((item) => {
              const isChecked = !!attributes[item.key];
              const isFeatured = featuredAttributes.includes(item.key);

              return (
                <Box key={item.key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
                  <Controller
                    name={`attributes.${item.key}`}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={!!field.value} 
                            onChange={(e) => {
                              field.onChange(e.target.checked);
                              // If unchecked, remove from featured
                              if (!e.target.checked && isFeatured) {
                                toggleFeatured(item.key);
                              }
                            }} 
                          />
                        }
                        label={item.label}
                      />
                    )}
                  />
                  
                  {isChecked && (
                    <Tooltip title={isFeatured ? "Remove from card" : "Feature on card"}>
                      <IconButton 
                        onClick={() => toggleFeatured(item.key)}
                        size="small"
                        color={isFeatured ? "warning" : "default"}
                        disabled={!isFeatured && featuredAttributes.length >= 5}
                      >
                        {isFeatured ? <Star /> : <StarBorder />}
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              );
            })}
          </FormGroup>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Stack>
  );
}
