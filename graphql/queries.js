import gql from 'graphql-tag'

export const GET_DATA = gql`
  query GetAllData($filterWorksInput: FilterWorksInput!) {
    works(filterWorksInput: $filterWorksInput) {
      id
      date
      amount
      partner {
        id
        name
        sectors {
          id
          name
        }
      }
      location {
        id
        name
      }
      sector {
        id
        name
      }
    }
    partners {
      id
      name
      phone
      location {
        id
        name
      }
      sectors {
        id
        name
      }
    }
    locations {
      id
      name
    }
    sectors {
      id
      name
    }
    ads {
      id
      amount
      date
      sector {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
`

export const CREATE_LOCATION = gql`
  mutation CreateLocation($createLocationInput: CreateLocationInput!) {
    createLocation(createLocationInput: $createLocationInput) {
      id
      name
    }
  }
`

export const CREATE_SECTOR = gql`
  mutation CreateSector($createSectorInput: CreateSectorInput!) {
    createSector(createSectorInput: $createSectorInput) {
      id
      name
    }
  }
`

export const CREATE_PARTNER = gql`
  mutation CreatePartner($createPartnerInput: CreatePartnerInput!) {
    createPartner(createPartnerInput: $createPartnerInput) {
      id
      name
      phone
      location {
        id
        name
      }
      sector {
        id
        name
      }
    }
  }
`

export const CREATE_WORK = gql`
  mutation CreateWork($createWorkInput: CreateWorkInput!) {
    createWork(createWorkInput: $createWorkInput) {
      id
      date
      amount
      partner {
        id
        name
      }
      location {
        id
        name
      }
      sector {
        id
        name
      }
    }
  }
`

export const CREATE_AD = gql`
  mutation CreateAd($createAdInput: CreateAdInput!) {
    createAd(createAdInput: $createAdInput) {
      id
      date
      amount
      location {
        id
        name
      }
      sector {
        id
        name
      }
    }
  }
`

export const UPDATE_WORK = gql`
  mutation UpdateWork($updateWorkInput: UpdateWorkInput!) {
    updateWork(updateWorkInput: $updateWorkInput) {
      id
      date
      amount
      partner {
        id
        name
      }
      location {
        id
        name
      }
      sector {
        id
        name
      }
    }
  }
`
