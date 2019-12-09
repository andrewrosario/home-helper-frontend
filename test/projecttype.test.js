let { ProjectCard } = require('../src/components/projectCard')

var project = {
  "id": 1,
  "before_photos": [
      "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--848d7aa804d8e825d07387fbde4e5550ea20c286/leaky-faucet.jpg"
  ],
  "materials": [
      {
          "id": 1,
          "name": "Adjustable wrench",
          "link": "",
          "cost": 10.0,
          "amount": 1.0,
          "amount_unit": "",
          "comments": [
              {
                  "id": 1,
                  "text": "Get a good one",
                  "created_at": "2019-11-14T20:32:22.903Z",
                  "user_name": "Andy",
                  "task_id": null,
                  "material_id": 1,
                  "resource_id": null
              }
          ]
      },
      {
          "id": 2,
          "name": "Screwdriver",
          "link": "",
          "cost": 10.0,
          "amount": 1.0,
          "amount_unit": "",
          "comments": []
      },
      {
          "id": 3,
          "name": "WD-40",
          "link": "",
          "cost": 5.0,
          "amount": 1.0,
          "amount_unit": "can",
          "comments": []
      },
      {
          "id": 4,
          "name": "Washer",
          "link": "",
          "cost": 5.0,
          "amount": 1.0,
          "amount_unit": "bag",
          "comments": []
      }
  ],
  "tasks": [
      {
          "id": 1,
          "text": "Turn off the water",
          "time_required": 1,
          "is_complete": true,
          "comments": []
      },
      {
          "id": 2,
          "text": "Remove knobs",
          "time_required": 5,
          "is_complete": true,
          "comments": []
      },
      {
          "id": 3,
          "text": "Loosen the nut attaching the faucet to the counter",
          "time_required": 10,
          "is_complete": true,
          "comments": []
      },
      {
          "id": 4,
          "text": "Remove the faucet",
          "time_required": 5,
          "is_complete": false,
          "comments": []
      },
      {
          "id": 5,
          "text": "Replace the O-ring in the faucet",
          "time_required": 10,
          "is_complete": true,
          "comments": []
      },
      {
          "id": 6,
          "text": "Re-attach the faucet to the counter",
          "time_required": 10,
          "is_complete": false,
          "comments": []
      },
      {
          "id": 7,
          "text": "Wine",
          "time_required": 60,
          "is_complete": false,
          "comments": []
      }
  ],
  "resources": [],
  "chat_room": {
      "id": 1,
      "messages": [
          {
              "id": 1,
              "chat_room_id": 1,
              "text": "Hi, How can I help?",
              "created_at": "2019-11-14T20:20:36.553Z",
              "updated_at": "2019-11-14T20:20:36.553Z",
              "user_id": 1
          },
          {
              "id": 2,
              "chat_room_id": 1,
              "text": "Do my tasks look correct so far?",
              "created_at": "2019-11-14T20:31:47.380Z",
              "updated_at": "2019-11-14T20:31:47.380Z",
              "user_id": 32
          },
          {
              "id": 3,
              "chat_room_id": 1,
              "text": "Looks perfect",
              "created_at": "2019-11-14T20:38:22.573Z",
              "updated_at": "2019-11-14T20:38:22.573Z",
              "user_id": 1
          },
          {
              "id": 4,
              "chat_room_id": 1,
              "text": "Thank you",
              "created_at": "2019-11-14T23:12:43.129Z",
              "updated_at": "2019-11-14T23:12:43.129Z",
              "user_id": 32
          },
          {
              "id": 5,
              "chat_room_id": 1,
              "text": "Your welcome",
              "created_at": "2019-11-14T23:13:27.450Z",
              "updated_at": "2019-11-14T23:13:27.450Z",
              "user_id": 1
          },
          {
              "id": 6,
              "chat_room_id": 1,
              "text": "hi",
              "created_at": "2019-11-14T23:21:16.887Z",
              "updated_at": "2019-11-14T23:21:16.887Z",
              "user_id": 32
          },
          {
              "id": 7,
              "chat_room_id": 1,
              "text": "Hi! How are you?",
              "created_at": "2019-11-14T23:21:28.523Z",
              "updated_at": "2019-11-14T23:21:28.523Z",
              "user_id": 1
          },
          {
              "id": 8,
              "chat_room_id": 1,
              "text": "good can I get a hug?",
              "created_at": "2019-11-14T23:21:38.220Z",
              "updated_at": "2019-11-14T23:21:38.220Z",
              "user_id": 32
          },
          {
              "id": 9,
              "chat_room_id": 1,
              "text": "No",
              "created_at": "2019-11-14T23:23:30.101Z",
              "updated_at": "2019-11-14T23:23:30.101Z",
              "user_id": 1
          },
          {
              "id": 10,
              "chat_room_id": 1,
              "text": "look at this",
              "created_at": "2019-11-14T23:30:29.018Z",
              "updated_at": "2019-11-14T23:30:29.018Z",
              "user_id": 32
          },
          {
              "id": 11,
              "chat_room_id": 1,
              "text": "Yes",
              "created_at": "2019-11-14T23:33:40.372Z",
              "updated_at": "2019-11-14T23:33:40.372Z",
              "user_id": 1
          },
          {
              "id": 12,
              "chat_room_id": 1,
              "text": "hello looking forr an experrt",
              "created_at": "2019-11-14T23:33:47.563Z",
              "updated_at": "2019-11-14T23:33:47.563Z",
              "user_id": 32
          },
          {
              "id": 13,
              "chat_room_id": 1,
              "text": "Hi",
              "created_at": "2019-11-14T23:35:37.780Z",
              "updated_at": "2019-11-14T23:35:37.780Z",
              "user_id": 1
          },
          {
              "id": 35,
              "chat_room_id": 1,
              "text": "Hi",
              "created_at": "2019-11-25T17:36:46.405Z",
              "updated_at": "2019-11-25T17:36:46.405Z",
              "user_id": 1
          }
      ]
  },
  "title": "Fix a Leaky Faucet",
  "description": "The faucet in my kitchen sink has a consistent drip",
  "expert": {
      "id": 1,
      "name": "Lizzo",
      "image": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d760bd1284a2bda418627a26ed0093885b0b2b2c/lizzo.jpg"
  },
  "project_type_id": 2,
  "novice": {
      "id": 32,
      "name": "Andy",
      "image": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--23b0f142ed8b75634a530fbe5e29c6d04929bfab/profile-square.jpg"
  },
  "expert_status": "accepted",
  "is_complete": false,
  "complete_tasks": 4
}

test('returns the correct project type', () => {
  const { id, description, title, project_type_id, expert } = project
  expect(projectType()).toBe('painting');
});