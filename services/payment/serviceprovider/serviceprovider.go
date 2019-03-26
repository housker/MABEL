package serviceProvider

type Item struct {
	Id       uint
	Name     string
	Price    float64
	ImageUri string
}

type User struct {
	Id       uint
	Name     string
	Location string
}

type Service interface {
	getItems() []Item
	addItem(Item)
	addSupplier(User)
	addBuyer(User)
	removeItem(uint)
}
