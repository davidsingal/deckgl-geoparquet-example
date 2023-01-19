import Dexie, { Table } from 'dexie';

interface Item {
  id: string;
  foodscapes: number;
  soil_group: number;
  intensity_group: number;
  dominant_crop: number;
  dominant_crop_group: number;
  country: string;
  province: string;
  critically_endangered_ecosystems: number;
  high_conservation_value_areas: number;
  agricultural_frontier_zones: number;
  soil_erosion: number;
  water_scarcity: number;
  climate_risk: number;
  population_change: number;
  pesticide_risk: number;
  pixel_count: number;
  staple_crop_production: number;
  cereals_oil_production: number;
  roots_tubers_production: number;
  legume_pulses_production: number;
  perrenials_production: number;
  vegetables_production: number;
  other_crops_production: number;
  cropland_restoration_area: number;
  grassland_restoration_area: number;
  cropland_to_silvoarable_area: number;
  grassland_to_silvopastoral_area_low: number;
  grassland_to_silvopastoral_area_high: number;
  cover_crops_area: number;
}

export class FoodscapesDatabase extends Dexie {
  // 'foodscapes' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  foodscapes!: Table<Item>;

  constructor() {
    super('foodscapes');
    this.version(1).stores({
      foodscapes:
        '++id, foodscapes, soil_group, intensity_group, dominant_crop, dominant_crop_group, country, province, critically_endangered_ecosystems, high_conservation_value_areas, agricultural_frontier_zones, soil_erosion, water_scarcity, climate_risk, population_change, pesticide_risk, pixel_count, staple_crop_production, cereals_oil_production, roots_tubers_production, legume_pulses_production, perrenials_production, vegetables_production, other_crops_production, cropland_restoration_area, grassland_restoration_area, cropland_to_silvoarable_area, grassland_to_silvopastoral_area_low, grassland_to_silvopastoral_area_high, cover_crops_area', // Primary key and indexed props
    });
  }
}

export const db = new FoodscapesDatabase();
