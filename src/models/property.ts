export interface Property {
    id_property:    number;
    rent:           number;
    currency:       string;
    type:           string;
    surface_area:   string;
    postal_address: string;
    created_at:     Date;
    updated_at:     Date;
    id_owner:       number;
}