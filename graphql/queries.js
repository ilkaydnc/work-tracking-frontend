import gql from 'graphql-tag'

export const CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      token
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      id
      name
      email
      token
    }
  }
`

export const GET_DATA = gql`
  query GetAllData(
    $filterWorksInput: FilterWorksInput!
    $filterStatistics: FilterStatisticInput!
  ) {
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
    statisticsWithFilter(filterStatistics: $filterStatistics) {
      works_total
      ads_total
    }

    statistics {
      works_total
      ads_total
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
      sectors {
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

export const UPDATE_PARTNER = gql`
  mutation UpdatePartner($updatePartnerInput: UpdatePartnerInput!) {
    updatePartner(updatePartnerInput: $updatePartnerInput) {
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
  }
`

export const UPDATE_AD = gql`
  mutation UpdateAd($updateAdInput: UpdateAdInput!) {
    updateAd(updateAdInput: $updateAdInput) {
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

export const DELETE_WORK = gql`
  mutation DeleteWork($id: String!) {
    deleteWork(id: $id) {
      id
    }
  }
`

export const DELETE_PARTNER = gql`
  mutation DeletePartner($id: String!) {
    deletePartner(id: $id) {
      id
    }
  }
`

export const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: String!) {
    deleteLocation(id: $id) {
      id
    }
  }
`

export const DELETE_SECTOR = gql`
  mutation DeleteSector($id: String!) {
    deleteSector(id: $id) {
      id
    }
  }
`

export const DELETE_AD = gql`
  mutation DeleteAd($id: String!) {
    deleteAd(id: $id) {
      id
    }
  }
`
