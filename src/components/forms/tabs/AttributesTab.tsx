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
import { useTranslations } from 'next-intl';

export default function AttributesTab() {
  const { control, watch, setValue } = useFormContext<RestaurantFormData>();
  const t = useTranslations('attributesTab');
  const ta = useTranslations('attributes');

  // Watch all attributes to know which are active
  const attributes = watch('attributes') || {};
  const featuredAttributes = watch('featuredAttributes') || [];

  const toggleFeatured = (key: string) => {
    const currentFeatured = [...(featuredAttributes || [])];
    const index = currentFeatured.indexOf(key);

    if (index !== -1) {
      currentFeatured.splice(index, 1);
      setValue('featuredAttributes', currentFeatured);
    } else {
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
          {t('title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('featuredOnCard', { count: featuredAttributes.length })}
        </Typography>
      </Box>

      {Object.entries(ATTRIBUTE_GROUPS).map(([groupKey, group]) => (
        <Box key={groupKey}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {ta(groupKey)}
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
                              if (!e.target.checked && isFeatured) {
                                toggleFeatured(item.key);
                              }
                            }}
                          />
                        }
                        label={ta(item.key)}
                      />
                    )}
                  />

                  {isChecked && (
                    <Tooltip title={isFeatured ? t('removeFromCard') : t('featureOnCard')}>
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
