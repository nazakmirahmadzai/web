using System;
using System.Collections.Generic;

namespace MunicipalityAPI.Models;

public partial class Owner
{
    public int OwnerId { get; set; }

    public string OwnerName { get; set; } = null!;

    public string? Phone { get; set; }

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
}
