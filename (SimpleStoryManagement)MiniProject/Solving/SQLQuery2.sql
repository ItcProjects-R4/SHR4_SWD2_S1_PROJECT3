CREATE DATABASE store_system;
GO

USE store_system;
GO



CREATE TABLE Customers (
    CustomerID INT IDENTITY(1,1) NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    Address NVARCHAR(200) NOT NULL,
    Phone NVARCHAR(20),
    Email NVARCHAR(100) UNIQUE,

    CONSTRAINT PK_Customers PRIMARY KEY (CustomerID)
);



CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) NOT NULL,
    ProductName NVARCHAR(100) NOT NULL,
    Price DECIMAL(10,2) NOT NULL CHECK (Price > 0),
    StockQuantity INT NOT NULL CHECK (StockQuantity >= 0),
    Category NVARCHAR(50),

    CONSTRAINT PK_Products PRIMARY KEY (ProductID)
);


CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    CustomerID INT NOT NULL,
    TotalAmount DECIMAL(12,2) DEFAULT 0,

    CONSTRAINT PK_Orders PRIMARY KEY (OrderID),

    CONSTRAINT FK_Orders_Customers
        FOREIGN KEY (CustomerID)
        REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderDetails (
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,

    CONSTRAINT PK_OrderDetails 
        PRIMARY KEY (OrderID, ProductID),

    CONSTRAINT FK_OrderDetails_Orders
        FOREIGN KEY (OrderID)
        REFERENCES Orders(OrderID),

    CONSTRAINT FK_OrderDetails_Products
        FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID),

    CONSTRAINT CHK_Quantity CHECK (Quantity > 0)
);

GO
CREATE FUNCTION GetOrderTotal (@OrderID INT)
RETURNS DECIMAL(12,2)
AS
BEGIN
    DECLARE @Total DECIMAL(12,2);

    SELECT @Total = SUM(Quantity * UnitPrice)
    FROM OrderDetails
    WHERE OrderID = @OrderID;

    RETURN ISNULL(@Total,0);
END;
GO



CREATE PROCEDURE UpdateOrderTotal
    @OrderID INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Orders
    SET TotalAmount = dbo.GetOrderTotal(@OrderID)
    WHERE OrderID = @OrderID;
END;
GO



CREATE TABLE OrderDetails_Audit (
    AuditID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    OldQuantity INT NULL,
    NewQuantity INT NULL,
    OldUnitPrice DECIMAL(10,2) NULL,
    NewUnitPrice DECIMAL(10,2) NULL,
    ActionType NVARCHAR(20),
    ActionDate DATETIME DEFAULT GETDATE()
);



GO
CREATE TRIGGER TR_AfterUpdate_OrderDetails
ON OrderDetails
AFTER UPDATE
AS
BEGIN
    INSERT INTO OrderDetails_Audit
    (
        OrderID,
        ProductID,
        OldQuantity,
        NewQuantity,
        OldUnitPrice,
        NewUnitPrice,
        ActionType
    )
    SELECT 
        d.OrderID,
        d.ProductID,
        d.Quantity,
        i.Quantity,
        d.UnitPrice,
        i.UnitPrice,
        'UPDATE'
    FROM deleted d
    JOIN inserted i
        ON d.OrderID = i.OrderID
        AND d.ProductID = i.ProductID;

    UPDATE O
    SET TotalAmount = dbo.GetOrderTotal(O.OrderID)
    FROM Orders O
    JOIN inserted i ON O.OrderID = i.OrderID;
END;
GO



CREATE TRIGGER TR_AfterDelete_OrderDetails
ON OrderDetails
AFTER DELETE
AS
BEGIN
    INSERT INTO OrderDetails_Audit
    (
        OrderID,
        ProductID,
        OldQuantity,
        OldUnitPrice,
        ActionType
    )
    SELECT 
        OrderID,
        ProductID,
        Quantity,
        UnitPrice,
        'DELETE'
    FROM deleted;

    UPDATE O
    SET TotalAmount = dbo.GetOrderTotal(O.OrderID)
    FROM Orders O
    JOIN deleted d ON O.OrderID = d.OrderID;
END;
GO

insert into Customers CustomerId