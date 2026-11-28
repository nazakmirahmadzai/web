using System;
using System.Collections.Generic;

namespace MunicipalityAPI.Models;

public partial class Property
{
    public int PropertyId { get; set; }

    public int OwnerId { get; set; }

    public string? Address { get; set; }

    public string? PropertyType { get; set; }

    public virtual Owner Owner { get; set; } = null!;
}
