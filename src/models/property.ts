export interface RentByOwner {
    id:          number;
    content:     string;
    datetime:    Date;
    created_at:  Date;
    updated_at:  Date;
    id_property: number;
    id_tenant:   number;
    property:    Property;
    tenant:      Tenant;
}

export interface Tenant {
    id_tenant:      number;
    first_name:     string;
    last_name:      string;
    postal_address: string;
    email:          string;
    telephone:      string;
    created_at:     Date;
    updated_at:     Date;
    id_property:    number;
}

export interface TenantProperty {
    propertyOwner: Property;
    tenant:        Tenant;
}

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