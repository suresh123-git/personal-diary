# 🗄️ Database Documentation & Schema Design

Database: **MongoDB 7.0+** with Mongoose ODM schemas.

## 📋 Collections & Schemas

### 1. `users`
- `_id`: ObjectId
- `name`: String
- `email`: String (Unique index)
- `passwordHash`: String
- `house`: Enum (`gryffindor` | `slytherin` | `ravenclaw` | `hufflepuff` | `unassigned`)
- `preferences`: Object
- `theme`: Object
- `notificationSettings`: Object
- `aiSettings`: Object
- `refreshTokenHash`: String (Optional)
- `lastLoginAt`: Date

### 2. `diaryentries`
- `_id`: ObjectId
- `userId`: ObjectId (Index)
- `title`: String
- `content`: String (Rich HTML/JSON)
- `plainTextContent`: String (Text indexed)
- `date`: String (`YYYY-MM-DD`, Index)
- `mood`: String (Index)
- `tags`: Array of Strings (Index)
- `location`: String
- `weather`: String
- `photos`: Array of Strings
- `isFavorite`: Boolean (Index)
- `isPrivate`: Boolean (Index)
- `isArchived`: Boolean (Index)

### 📊 Database Indexes
```javascript
db.diaryentries.createIndex({ userId: 1, date: -1 });
db.diaryentries.createIndex({ userId: 1, createdAt: -1 });
db.diaryentries.createIndex({ userId: 1, isFavorite: 1 });
db.diaryentries.createIndex({ userId: 1, tags: 1 });
db.diaryentries.createIndex({ title: "text", plainTextContent: "text" });
```
