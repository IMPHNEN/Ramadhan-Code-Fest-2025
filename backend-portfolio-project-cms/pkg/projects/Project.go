package projects

type Project struct {
	Id				string 	`gorm:"primaryKey" json:"id"`
	Name 			string 	`gorm:"size:50" json:"name"`
	Description 	string 	`gorm:"text" json:"description"`
	ImageUrl 		string 	`gorm:"text" json:"imageUrl"`
	IntId			int		`gorm:"autoIncrement" json:"intId"`
}