import { instance as request } from './request';


export const fetchUsers = () =>
  request({
    method: 'post',
    url: '/api/user/all'
  });

export const addUser = (payload) => {
  request({
    method: 'post',
    url: '/api/user/add',
    data: payload
  });
}

// export const getUserById = (id) =>
//   request({
//     method: 'get',
//     url: '/api/v1/users/' + id
//   });

export const updateUser = (payload) =>
  request({
    method: 'put',
    url: '/api/user/' + payload.id,
    data: {
      fullname: payload.fullname,
      email: payload.email,
      phone: payload.phone,
      birthdate: payload.birthdate,
      address1: payload.address1,
      address2: payload.address2,
      city: payload.city,
      state: payload.state,
      postal: payload.postal,
      country: payload.country,
    }
  });

// export const deleteUser = id =>
//   request({
//     method: 'delete',
//     url: '/api/v1/users/' + id
//   });
